import React, { ChangeEvent } from "react";

class ProfileStatus extends React.Component<
  { status: string; updateUserStatus: (status: string) => void },
  any
> {
  state = { editMode: false, status: this.props.status };
  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateUserStatus(this.state.status);
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ status: e.currentTarget.value });
  };

  render() {
    return (
      <>
        {!this.state.editMode && (
          <div>
            <span
              onDoubleClick={() => {
                this.activateEditMode();
              }}
            >
              Status:{this.props.status}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              onChange={this.onStatusChange}
              onBlur={this.deactivateEditMode}
              autoFocus={true}
              type="text"
              value={this.state.status}
            />
          </div>
        )}
      </>
    );
  }
}

export default ProfileStatus;
