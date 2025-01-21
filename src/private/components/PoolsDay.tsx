import { Table } from "antd"
import { columnsType, dataColumnsType } from "../pages/HomePage"
import { TableRowSelection } from "antd/es/table/interface"
import { DeleteFilled } from "@ant-design/icons"

type Props = {
    LoadingCleanings: boolean
    OnHandleOpenModalDeletePayment: (cleaning: dataColumnsType) => void
    dataColumns: dataColumnsType[]
    rowSelection: TableRowSelection<dataColumnsType>
}

export const PoolsDay = ({LoadingCleanings, dataColumns, rowSelection, OnHandleOpenModalDeletePayment}: Props) => {


        const clientsColumns : columnsType[] = [
            {
                title: "Name ",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Neighborhood",
                dataIndex: "neighborhood",
                key: "neighborhood",
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price",
            },
            {
                title:"Delete",
                dataIndex:"delete",
                key:"delete",
                render:(_: any, cleaning: dataColumnsType) => (
                    <div style={{display:"flex", justifyContent:"center", }}>
                                <DeleteFilled
                                    style={{color: "#b61212"}} 
                                    className="hover_DeleteFilled" 
                                    onClick={ () => OnHandleOpenModalDeletePayment(cleaning)}/>
                            </div>
                        )
            }
        ]

  return (
    <Table 
    rowKey={"id"}
    loading={LoadingCleanings}
    columns={clientsColumns} 
    dataSource={dataColumns} 
    rowSelection={rowSelection}
    pagination={{pageSize: 10}}
    size="small"
    rowClassName={(cli, index) => {
        const rowClass = index % 2 === 0 ? "even-row" : "odd-row"
        if(cli.cleaning) {
            return `${rowClass} disable-row`
        }
        return rowClass
    }}
    style={{boxShadow: "1px 1px 5px black", overflow: "hidden", borderRadius: "10px"}}
    >
</Table>
  )
}