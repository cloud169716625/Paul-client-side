import { useState, useEffect } from "react";
import { Modal as BSModal } from "react-bootstrap";
import "./Modal.styles.scss";
import { Button, Checkbox } from "antd";
import { Fragment } from "react";

export function Modal({
    show,
    setShow,
    heading,
    loading,
    handleSubmit,
    permissions = [
        {
            name: "ModuleManagement",
            permissionDetail: {
                Create: false,
                View: false,
                Remove: false,
                Update: false,
            },
        },
    ],
    submitText = "Configure Permissions",
    cancelButtonText = "Cancel",
    handleCancel,
}) {
    const [permissionsState, setPermissionsState] = useState([]);
    const handleClose = () => {
        setShow(false);
        setPermissionsState(permissions);
    };

    useEffect(() => {
        setPermissionsState(permissions);
    }, [permissions]);

    return (
        <BSModal
            show={show}
            onHide={handleClose}
            className={`custom-modal custom-modal__crud`}
        >
            <BSModal.Body className="modal__bg">
                <div className="modal__header">
                    <h3>{heading}</h3>
                </div>
                <div className="modal__divider" />
                <div className="modal__body">
                    <div className="modal__form">
                        {permissionsState && permissionsState.map(
                            (
                                { name, permissionDetail: { Create, View, Update, Remove } },
                                index
                            ) => {
                                return (
                                    <Fragment key={name}>
                                        <div className="modal__form-el" key={name}>
                                            <div className="modal__form-el-checkbox">
                                                <div className="modal__form-el-checkbox-container">
                                                    <div className="modal__form-el-checkbox-container-label">
                                                        {name}
                                                    </div>
                                                    <div className="modal__form-el-checkbox-container-group">
                                                        <Checkbox
                                                            disabled={loading}
                                                            onChange={(e) => {
                                                                const newPermissions = permissionsState && permissionsState.map(
                                                                    (permission) => {
                                                                        return permission?.name === name
                                                                            ? {
                                                                                ...permission,
                                                                                permissionDetail: {
                                                                                    Create: e.target.checked,
                                                                                    View: e.target.checked,
                                                                                    Update: e.target.checked,
                                                                                    Remove: e.target.checked,
                                                                                },
                                                                            }
                                                                            : permission;
                                                                    }
                                                                );
                                                                setPermissionsState(newPermissions);
                                                            }}
                                                            checked={Create && View && Update && Remove}
                                                        >
                                                            <p className="modal__form-el-checkbox-container-label">
                                                                All
                                                            </p>
                                                        </Checkbox>
                                                        <div
                                                            key={name}
                                                            className="modal__form-el-checkbox-container-el"
                                                        >
                                                            <Checkbox
                                                                disabled={loading}
                                                                checked={Create}
                                                                onChange={(e) => {
                                                                    const newPermissions = permissionsState && permissionsState.map(
                                                                        (permission) => {
                                                                            return permission?.name === name
                                                                                ? {
                                                                                    ...permission,
                                                                                    permissionDetail: {
                                                                                        ...permission?.permissionDetail,
                                                                                        Create: e.target.checked,
                                                                                    },
                                                                                }
                                                                                : permission;
                                                                        }
                                                                    );
                                                                    // console.log(newPermissions);
                                                                    setPermissionsState(newPermissions);
                                                                }}
                                                            >
                                                                <p className="modal__form-el-checkbox-container-label">
                                                                    Create
                                                                </p>
                                                            </Checkbox>
                                                            <Checkbox
                                                                disabled={loading}
                                                                checked={View}
                                                                onChange={(e) => {
                                                                    const newPermissions = permissionsState && permissionsState.map(
                                                                        (permission) => {
                                                                            return permission?.name === name
                                                                                ? {
                                                                                    ...permission,
                                                                                    permissionDetail: {
                                                                                        ...permission?.permissionDetail,
                                                                                        View: e.target.checked,
                                                                                    },
                                                                                }
                                                                                : permission;
                                                                        }
                                                                    );
                                                                    // console.log(newPermissions);
                                                                    setPermissionsState(newPermissions);
                                                                }}
                                                            >
                                                                <p className="modal__form-el-checkbox-container-label">
                                                                    Read
                                                                </p>
                                                            </Checkbox>
                                                            <Checkbox
                                                                disabled={loading}
                                                                checked={Update}
                                                                onChange={(e) => {
                                                                    const newPermissions = permissionsState && permissionsState.map(
                                                                        (permission) => {
                                                                            return permission?.name === name
                                                                                ? {
                                                                                    ...permission,
                                                                                    permissionDetail: {
                                                                                        ...permission?.permissionDetail,
                                                                                        Update: e.target.checked,
                                                                                    },
                                                                                }
                                                                                : permission;
                                                                        }
                                                                    );
                                                                    // console.log(newPermissions);
                                                                    setPermissionsState(newPermissions);
                                                                }}
                                                            >
                                                                <p className="modal__form-el-checkbox-container-label">
                                                                    Update
                                                                </p>
                                                            </Checkbox>
                                                            <Checkbox
                                                                disabled={loading}
                                                                checked={Remove}
                                                                onChange={(e) => {
                                                                    const newPermissions = permissionsState && permissionsState.map(
                                                                        (permission) => {
                                                                            return permission?.name === name
                                                                                ? {
                                                                                    ...permission,
                                                                                    permissionDetail: {
                                                                                        ...permission?.permissionDetail,
                                                                                        Remove: e.target.checked,
                                                                                    },
                                                                                }
                                                                                : permission;
                                                                        }
                                                                    );
                                                                    // console.log(newPermissions);
                                                                    setPermissionsState(newPermissions);
                                                                }}
                                                            >
                                                                <p className="modal__form-el-checkbox-container-label">
                                                                    Remove
                                                                </p>
                                                            </Checkbox>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {permissions?.length > index + 1 ? (
                                            <div className="modal__crud-divider" />
                                        ) : (
                                            <></>
                                        )}
                                    </Fragment>
                                );
                            }
                        )}
                    </div>

                    <div className="modal__buttons flex">
                        <button
                            onClick={handleCancel ? handleCancel : handleClose}
                            type="button"
                            className="modal__buttons-btn modal__buttons-btn-secondary"
                        >
                            {cancelButtonText}
                        </button>
                        <Button
                            loading={loading}
                            onClick={() => {handleSubmit(permissionsState); setPermissionsState(permissions);}}
                            htmlType="button"
                            className="modal__buttons-btn modal__buttons-btn-primary"
                        >
                            {submitText}
                        </Button>
                    </div>
                </div>
            </BSModal.Body>
        </BSModal>
    );
}
