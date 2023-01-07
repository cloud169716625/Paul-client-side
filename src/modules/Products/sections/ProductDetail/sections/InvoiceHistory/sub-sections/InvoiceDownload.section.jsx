import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Svg,
    G,
    Path,
} from "@react-pdf/renderer";
import moment from "moment/moment";

export const InvoiceDownload = ({ invoice, user }) => {
    const styles = StyleSheet.create({
        page: {
            backgroundColor: "#fff",
        },
        invoice: {
            margin: 20,
            padding: 20,
            border: "1px solid #999999",
            borderRadius: "5px",
        },
        invoiceDetails: {
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 20,
        },
        invoiceDetailsLeft: {
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
        },
        invoiceDetailsRight: {
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            width: "50%",
        },
        invoiceCompanyName: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
        },
        userCompanyName: {
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
        },
        userDetailRow: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexDirection: "row",
        },
        productTitles: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            height: "30px",
            borderBottom: "1px dashed #999999",
        },
        productRoundIcon: {
            width: "8px",
            height: "8px",
            borderRadius: "4px",
        },
        fs_10: {
            fontSize: "10px"
        },
        fs_16: {
            fontSize: "16px"
        },
        textRightAlign: {
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column",
        },
    })
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.invoice}>
                    <View style={{ ...styles.invoiceDetails }}>
                        <View style={{ ...styles.invoiceDetailsLeft }}>
                            <View style={{ ...styles.fs_16 }}>
                                <Text>{invoice?.billNo}</Text>
                            </View>
                            <View style={{ ...styles.fs_10 }}>
                                <Text style={{ color: "#999999" }}>{"Invoice Date"}</Text>
                                <Text>{moment(invoice?.createdOn).format('MMMM Do, YYYY') || "N/A"}</Text>
                            </View>
                            <View style={{ ...styles.fs_10 }}>
                                <Text style={{ color: "#999999" }}>{"Due Date"}</Text>
                                <Text>
                                    {moment(invoice?.dueDate).format('MMMM Do, YYYY') || "N/A"}
                                    {moment(invoice?.dueDate).isSame(new Date(), "day")}{" "}
                                    {moment(invoice?.dueDate).isSame(new Date(), "day") ? (
                                        <Text>
                                            Due Today
                                        </Text>
                                    ) : (
                                        ""
                                    )}
                                </Text>
                            </View>
                        </View>
                        <View style={{ ...styles.invoiceDetailsRight }}>
                            <View style={{ ...styles.invoiceCompanyName, ...styles.fs_16, marginBottom: "5px" }}>
                                <Text style={{ margin: "0 4px 0 0" }}>{"Bill to"}</Text>
                                <Svg width="25">
                                    <G transform="translate(-920 -80)">
                                        <G transform="translate(920 80)">
                                            <G>
                                                <Path d="M15.68,14.972a9.409,9.409,0,0,1-6.48,2.32A9.666,9.666,0,0,1,0,7.532V.5A.5.5,0,0,1,.85.152Z" transform="translate(2.22 4.708)" fill="#000" />
                                                <Path d="M0,2.3A9.332,9.332,0,0,1,6.43,0a9.581,9.581,0,0,1,9.12,9.68v6.96a.5.5,0,0,1-.85.35Z" transform="translate(6.22 1.996)" fill="#000" />
                                                <Path d="M0,0H24V24H0Z" fill="none" opacity="0" />
                                            </G>
                                        </G>
                                    </G>
                                </Svg>
                                <Text style={{ margin: "0 0 0 4px" }}>{"Company Name"}</Text>
                            </View>
                            <View style={{ ...styles.userCompanyName, marginBottom: "5px" }}>
                                <Text style={{ ...styles.fs_10 }}>{user?.companyName}</Text>
                            </View>
                            <View style={{ ...styles.userDetailRow, marginBottom: "5px" }}>
                                <View style={{ ...styles.textRightAlign, ...styles.fs_10, width: "65%", }}>
                                    <Text style={{ color: "#999999", }}>{"Address"}</Text>
                                    <Text>{user?.address1 || 'N/A'}, {user?.address2 || 'N/A'}</Text>
                                </View>
                                <View style={{ ...styles.textRightAlign, ...styles.fs_10, width: "35%", }}>
                                    <Text style={{ color: "#999999", }}>{"Full Name"}</Text>
                                    <Text>{user?.fullName || 'N/A'}</Text>
                                </View>
                            </View>
                            <View style={{ ...styles.userDetailRow }}>
                                <View style={{ ...styles.textRightAlign, ...styles.fs_10, width: "65%", }}>
                                    <Text style={{ color: "#999999", }}>{"Email"}</Text>
                                    <Text>{user?.email || 'N/A'}</Text>
                                </View>
                                <View style={{ ...styles.textRightAlign, ...styles.fs_10, width: "35%", }}>
                                    <Text style={{ color: "#999999", }}>{"Phone Number"}</Text>
                                    <Text>{user?.phoneNumber || 'N/A'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={{ ...styles.productTitles, ...styles.fs_10 }}>
                            <Text>
                                {("SAMPLE PRODUCT")}
                            </Text>
                            <Text>
                                {("AMOUNT")}
                            </Text>
                        </View>
                        <View>
                            {invoice?.orderProductLineItems?.map((data, index) => (
                                <View key={index} style={{ ...styles.productTitles, ...styles.fs_10 }}>
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ ...styles.productRoundIcon, border: "2px solid #F64E60", }}></View>
                                        <Text style={{ ...styles.fs_10, paddingLeft: "2px" }}>
                                            {data?.lineItem}
                                        </Text>
                                    </View>
                                    <Text style={{ ...styles.fs_10 }} >
                                        ${data?.price}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        <View>
                            <View style={{ ...styles.productTitles, ...styles.fs_10 }}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ ...styles.productRoundIcon, border: "2px solid #323248", }}></View>
                                    <Text style={{ ...styles.fs_10, paddingLeft: "2px" }}>
                                        Sub Total
                                    </Text>
                                </View>
                                <Text style={{ ...styles.fs_10 }}>${invoice?.subTotal || 'N/A'}</Text>
                            </View>
                            <View style={{ ...styles.productTitles, ...styles.fs_10 }}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ ...styles.productRoundIcon, border: "2px solid #323248", }}></View>
                                    <Text style={{ ...styles.fs_10, paddingLeft: "2px" }}>
                                        Tax
                                    </Text>
                                </View>
                                <Text style={{ ...styles.fs_10 }}>${invoice?.vat || 'N/A'}</Text>
                            </View>
                            <View style={{ ...styles.productTitles, ...styles.fs_10 }}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ ...styles.productRoundIcon, border: "2px solid #323248", }}></View>
                                    <Text style={{ ...styles.fs_10, paddingLeft: "2px" }}>
                                        Total
                                    </Text>
                                </View>
                                <Text style={{ ...styles.fs_10 }}>${invoice?.totalPrice || 'N/A'}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}