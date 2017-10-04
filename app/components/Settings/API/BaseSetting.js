// @flow
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changePermissionToExit } from '../../../actions/appActions';
import { handleChange, discardChange } from '../../../actions/settingsActions';

export interface SpecificSetting {
  state: {
    newValue: string
  }
}
export interface SpecificSettingWithValidation {
  state: {
    newValue: string
  },
  updateValid: (valid: boolean) => any, // this.setState({ valid })
  handleErrors?: (error: Error) => any
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
    if (this.props.value !== nextProps.value) {
      this.setState({ stagedChangesIndex: -1 });
    }
    // Start only if componentWillReceiveProps was called because the value in the
    // parent component has changed
    if (this.props.newValue !== nextProps.newValue) {
      // Ignore the change if its the same as the saved one
      if ((this.props.value === nextProps.newValue) && this.state.stagedChangesIndex > -1) {
        if (this.props.updateValid)
          this.props.updateValid(true);
        this.props.discardChange(this.state.stagedChangesIndex);
        this.setState({ stagedChangesIndex: -1 });
        // else start the process
      } else if (this.props.newValue !== nextProps.newValue) {
        if (this.props.value !== nextProps.newValue)
          this.validate(nextProps.newValue);
      }
    }
  }
  validate = (newValue: string) => {
    if (this.props.validateFunctionAsync) {
      this.props.validateFunctionAsync(newValue) //eslint-disable-line
        .then(() => {
          this.commit(newValue);
        })
        .catch(error => {
          if (this.props.updateValid)
            this.props.updateValid(false);
          else
            throw new Error('updateValid() is a required prop if you expect validation');
          if (this.props.handleErrors)
            this.props.handleErrors(error);
        });
    } else if (this.props.validateFunctionSync) {
      try {
        this.props.validateFunctionSync(newValue);
        this.commit(newValue);
      } catch (error) {
        if (this.props.updateValid)
          this.props.updateValid(false);
        else
          throw new Error('updateValid() is a required prop if you expect validation');
        if (this.props.handleErrors)
          this.props.handleErrors(error);
      }
    } else
      this.commit(newValue);
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
