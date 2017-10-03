import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mixin from './mixin';

import { changePermissionToExit } from '../../../../actions/appActions';
import { handleChange, discardChange } from '../../../../actions/settingsActions';

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

/**
 * Decorator to connect the Component to the standard props
 * @param {Component} target The react component class
 */
export function connectStandardProps(target) {
  return connect(mapStateToProps, mapDispatchToProps)(target);
};

export const injectMethods = mixin({
  init() {

  },
  componentWillReceiveProps(nextProps) {
    if (this.state.valid === false) {
      if (this.props.permissionToExit === false && nextProps.permissionToExit === true)
        this.setState({ stagedChangesIndex: -1 });
    }
  },
  change(newValue) {
    if (this.props.value === this.state.value) {
      // Do nothing if its the same value
      if (this.state.stagedChangesIndex >= -1) {
        this.props.discardChange(this.state.stagedChangesIndex);
        this.setState({ stagedChangesIndex: -1 });
      }
    } else {
      this.setState({ value: newValue });
      this.validate(newValue);
    }
  },
  // handleError(error: Error) => implement in component
  commmit(newValue) {
    this.setState({
      valid: true,
      stagedChangesIndex: this.props.stagedChangesLength
    });
    this.props.handleChange(
      this.state.value,
      this.props.paths,
      this.state.stagedChangesIndex
    );
    this.props.changePermissionToExit(false);
  },
  validate(newValue) {
    try {
      // Async validation
      if (this.props.validateFunctionAsync) {
        this.props.validateFunctionAsync(newValue)
          .then(() => {
            this.commit(newValue);
          });
      // Sync validation
      } else if (this.props.validateFunctionSync) {
        try {
          this.props.validateFunction(newValue)
          this.commit(newValue);
        }
      // No validation
      } else {
        this.commit(newValue);
      }
    } catch (error) {
      this.setState({ valid: false });
      this.handleError(error);
    }
  }
});
