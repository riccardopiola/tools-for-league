// @flow
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changePermissionToExit } from '../../../../actions/appActions';
import { handleChange, discardChange } from '../../../../actions/settingsActions';

export interface SpecificSetting {
  state: {
    newValue: string,
    valid: boolean
  }
}
export interface SpecificSettingWithValidation {
  state: {
    newValue: string,
    valid: boolean
  },
  updateValid: (valid: boolean) => any, // this.setState({ valid })
  handleErrors: (error: Error) => any
}

function mapStateToProps(state) {
  return {
    stagedChangesLength: state.settings.stagedChanges.length,
    permissionToExit: state.app.permissionToExit,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ handleChange, discardChange, changePermissionToExit },
    dispatch);
}

type BaseProps = {
  // Coming from redux connect()
  permissionToExit: boolean,
  stagedChangesLength: number,
  handleChange: (newValue: string | boolean, paths: string[], index: number) => void,
  changePermissionToExit: (canChange: boolean) => void,
  discardChange: (index: number) => void,
  // Coming from parent props
  value: string,
  paths: string[],
  validateFunctionAsync?: (path: string) => Promise<boolean>,
  validateFunctionSync?: (path: string) => boolean,
  // Coming from parent state
  newValue: string,
  valid: boolean,
  // Methods from above
  updateValid?: (valid: boolean) => void,
  handleErrors?: (error: Error) => void
};
type BaseState = {
  stagedChangesIndex: number
};

/**
 * Class (Component) that handles:
 *  - Updating redux store
 *  - Checking if the changes are valid according to the function provided
 * This could have very well been a normal Class and not a component,
 * might wanna change in the future.
 */
class BaseSetting extends Component<BaseProps, BaseState> {
  state = { stagedChangesIndex: -1 }
  componentWillReceiveProps(nextProps: BaseProps) {
    // Check if it has saved the changes and reset
    if (this.state.valid === false) {
      if (this.props.permissionToExit === false && nextProps.permissionToExit === true)
        this.setState({ stagedChangesIndex: -1 });
    }
    // Start the checking machine
    if (this.props.value === nextProps.newValue) {
      // Do nothing if its the same value
      if (this.state.stagedChangesIndex >= -1) {
        this.props.discardChange(this.state.stagedChangesIndex);
        this.setState({ stagedChangesIndex: -1 });
      }
    } else {
      this.validate(nextProps.newValue);
    }
  }
  validate = (newValue: string) => {
    try {
      // Async validation
      if (this.props.validateFunctionAsync) {
        this.props.validateFunctionAsync(newValue) //eslint-disable-line
          .then(() => {
            this.commit(newValue);
          });
        // Sync validation
      } else if (this.props.validateFunctionSync) {
        this.props.validateFunctionSync(newValue);
        this.commit(newValue);
        // No validation
      } else {
        this.commit(newValue);
      }
    } catch (error) {
      if (this.props.updateValid)
        this.props.updateValid(false);
      else
        throw new Error('updateValid() is a required prop if you expect validation');
      if (this.props.handleErrors)
        this.props.handleErrors(error);
      else
        throw new Error('handleErrors() is a required prop if you expect validation');
    }
  }
  commit = (newValue: string) => {
    this.setState({ stagedChangesIndex: this.props.stagedChangesLength });
    if (this.props.updateValid)
      this.props.updateValid(true);
    this.props.handleChange(
      newValue,
      this.props.paths,
      this.state.stagedChangesIndex
    );
    this.props.changePermissionToExit(false);
  }
  render() {
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseSetting);
