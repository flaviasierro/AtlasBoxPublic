import { IoInformationCircle } from 'react-icons/io5';
import './Table.css'
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs'

interface TableSpecificProps {
  deleteItem?: (targetIndex: number) => void;
  editItem?: (targetIndex: number) => void;

}

export interface tableProps extends TableSpecificProps {
  id: string;
  columns: tableColumn[];
  list: string[];
}

export interface tableColumn {
  header: string;
  name: string;
  textAlign?: "center" | "left" | "right";
  sort?: boolean;
  hide?: boolean;
  deleteItem?: (targetIndex: number) => void; // Adicione a propriedade deleteItem
  editItem?: (targetIndex: number) => void; // Adicione a propriedade deleteItem

}
const Table = (props: tableProps) => {
  const { columns, list } = props;
  // Verificar se a lista está vazia
  const isListEmpty = list.length === 0;
  const isColumnsEmpty = columns.length === 0;
  const hasColumns = columns && columns.length > 0;
  // ...

  if (isListEmpty && isColumnsEmpty) {
    return (
      <div className='empty-table'>
        <div className='empty-table-header'>
          {hasColumns &&
            columns.map((col: tableColumn, index: number) => (
              <div key={index} className={index === 1 ? 'expand' : ''}>
                {col.name}
              </div>
            ))}
          {!isColumnsEmpty && <div>Actions</div>}
        </div>
        <div className='empty-table-content'>
          <IoInformationCircle size={30} />
          <span>Sem registros</span>
        </div>
      </div>
    );
  }


  return (
    <div className='table-wrapper'>
      <table id={props.id} className={`table ${hasColumns ? '' : 'no-columns'}`}>
        <thead>
          <tr>
            {columns?.map((col: tableColumn, index: number) => (
              <th key={index} className={index === 1 ? 'expand' : ''}>
                {col.name}
              </th>
            ))}
            {!isColumnsEmpty && (<th>Actions</th>)}
          </tr>
        </thead>
        <tbody>
          {isListEmpty ? (
            <tr>
              <td colSpan={columns.length + (isColumnsEmpty ? 0 : 1)}>
                <IoInformationCircle /> <span>Sem registros</span>
              </td>
            </tr>
          ) : (
            props.list?.map((item: any, index: number) => {
              const valuesArray = item ? Object.values(item) : [];
              return (
                <tr key={index}>
                  {valuesArray.map((value: any, columnIndex: number) => (
                    <td key={columnIndex}>{value || '-'}</td>
                  ))}
                  {props.deleteItem && (
                    <td>
                      <span className='actions'>
                        <BsFillTrashFill
                          className='btn-delete'
                          onClick={() => props.deleteItem && props.deleteItem(index)}
                        />
                        <BsPencilFill onClick={() => props.editItem && props.editItem(index)}/>
                      </span>
                    </td>
                  )}
                </tr>
              );
            })

          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
