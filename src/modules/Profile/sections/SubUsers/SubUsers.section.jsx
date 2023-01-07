import { Button, Switch } from "antd";
import UserName from "layout/components/navbar/UserProfileCard/UserName";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "./SUTable/SUTable.component"
import { checkModule } from "lib/checkModule";
import { Add, Delete, EditPermissions, EditSubUser } from "./sections";
import { getAllSubUsers, getSubUserByID } from "store";
import { activateSubUserByID } from "store";
import { deactivateSubUserByID } from "store";
import { getSubuserAppModules } from "store/Actions/ModuleActions";

export const SubUsers = () => {

    const { subUsers, loading } = useSelector((state) => state?.subUsers);

    const [data, setData] = useState([]);
    // Edit Modal State Start
    const [showEdit, setShowEdit] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [show, setShow] = useState(false);
    const [editPermissions, setEditPermissions] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [showDelete, setShowDelete] = useState(false);
    const [recordToDel, setRecordToDel] = useState(false);

    const { permissions } = checkModule({
        module: "Dashboard",
        modules: {},
    })
    const subUserStatusUpdate = (value, rowData) => {
        const { key } = rowData
        value ? dispatch(activateSubUserByID(key)) : dispatch(deactivateSubUserByID(key))
    }

    const columns = [
        {
            // title: "LABEL",
            dataIndex: "label",
            key: "label",
            render: (subUsers) => {
                return (
                    <div className="flex items-center gap-2">
                        {subUsers && subUsers.base64Image && !imgError ? (
                            <div className="bg-[#171723] flex items-center justify-center w-[47px] h-[47px] rounded-lg p-[4px]">
                                <img
                                    className="w-full h-full rounded-lg"
                                    src={subUsers?.base64Image}
                                    alt="user"
                                    onError={() => setImgError(true)}
                                />
                            </div>
                        ) : (
                            <div className="bg-[#171723] flex items-center justify-center w-[47px] h-[47px] rounded-lg p-[4px] text-[#0BB783] text-[18px] font-bold">
                                <>{subUsers && <UserName isLoggedIn={isLoggedIn} user={subUsers} />}</>
                            </div>
                        )}
                        <div className="">
                            <div className="text-sm text-white">{subUsers?.fullName}</div>
                            <div className="text-[#92928F] text-sm">{subUsers?.email}</div>
                        </div>
                    </div>
                );
            }
            // sorter: (a, b) => (a?.number < b?.number ? -1 : 1),
        },
        {
            // title: "Status",
            name: 'status',
            dataIndex: "status",
            type: 'switch',
            key: "status",
            render: (text, record) => {
                return (
                    <div>
                        <Switch
                            // autoFocus
                            checkedChildren="Enable"
                            unCheckedChildren="Disable"
                            // checked={record?.status}
                            defaultChecked={record?.status}
                            onChange={(e) => subUserStatusUpdate(e, record)}
                        >
                        </Switch>
                    </div>
                )
            },
            // render: (value) => <Switch checked={value} disabled={false} />,
        },
    ];

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSubUsers());
        dispatch(getSubuserAppModules());
    }, []);

    useEffect(() => {
        if (subUsers) {
            let dataArr = [];
            subUsers.forEach((key, index) => {
                dataArr.push({
                    index: index,
                    key: key?.id,
                    label: {
                        email: key?.email,
                        fullName: key?.fullName,
                        base64Image: key?.base64Image,
                    },
                    status: key?.isActive,
                });
            });
            setData(dataArr);
        }
    }, [subUsers]);

    return (
        <div className="mt-[20px] bg-[#1E1E2D] rounded-[8px] pb-[32px]">
            <div className="p-4 up-api-keys__table">
                <Table
                    data={data}
                    columns={columns}
                    loading={loading || "userLoading"}
                    btnData={{ text: "Add New Sub-User", onClick: () => setShow(true) }}
                    fieldToFilter="label"
                    permissions={permissions}
                    // style={{outerWidth:800}}
                    pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                        pageSizeOptions: ["5", "10", "20", "50", "100", "200"],
                    }}
                    // rowSelection={rowSelection}
                    editAction={(record) => (
                        <>
                            <Button
                                onClick={async () => {
                                    await dispatch(getSubUserByID(record?.key));
                                    setShowEdit(true);
                                }}
                            >
                                Modify
                            </Button>
                            <Button
                                onClick={async () => {
                                    await dispatch(getSubUserByID(record?.key));
                                    setEditPermissions(true);
                                }}
                            >
                                Permissions
                            </Button>
                        </>
                    )}
                    deleteAction={(record) => {
                        return (
                            <Button
                                onClick={async () => {
                                    setRecordToDel(record?.key);
                                    setShowDelete(true);
                                }}
                            >
                                Delete
                            </Button>
                        );
                    }}
                // permissions={{ View: true, Update: true, Remove: true }}
                // t={t}
                />
            </div>
            {/* Modals */}
            <Add show={show} setShow={setShow} />
            <EditSubUser show={showEdit} setShow={setShowEdit} />
            <EditPermissions show={editPermissions} setShow={setEditPermissions} />
            <Delete show={showDelete} setShow={setShowDelete} id={recordToDel} />
        </div>
    );
};
