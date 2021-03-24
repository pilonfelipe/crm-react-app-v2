import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import SearchDialog from '../SearchDialog';
import PageHeader from './PageHeader';
import SearchIconButton from './SearchButton';
import AddButton from './AddButton';
import EditDialog from '../EditDialog';
import { AppStateContext } from '../../contexts/AppState';
import { useIntl } from 'react-intl';
import { Can } from '../../../contexts/Can';

const ReportPage = ({
    title, columns, getDataFnc, searchSchema, addSchema,
    addValues, addFnc, editSchema, editFnc, 
    modelName, modelTitle, getFnc, rowId
}) => {
    const { setPageTitle } = useContext(AppStateContext);

    const loc = useLocation();
    const intl = useIntl();

    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState((loc.state && loc.state.filters) || undefined);
    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [selected, setSelected] = useState({});
    const [data, setData] = useState([]);

    const _modelTitle = intl.formatMessage({id: modelTitle || 'Record'});
    
    useEffect(() => {
        if (title)
            setPageTitle(title);

        if (!filters)
            setFilterOpen(true);
    // eslint-disable-next-line
    }, []);

    const handleSubmitFilters = (newFilters) => {
        const _newFilters = Object.entries(newFilters).reduce((prevFil, [filKey, fld]) => {
            return {
                ...prevFil,
                [filKey]: `${fld.value || ''}${fld.likeSuffix || ''}`
            }
        }, {})
        setFilters(_newFilters);
    }

    const handleEdit = (row) => {
        setSelected(row);
        setUpdateOpen(true);
    }

    const handleUpdate = () => {
        setLastUpdate(new Date());
    }

    return (
        <Fragment>
            <PageHeader>
                {
                    addSchema &&
                    <Can I='add' an={modelName}>
                        <AddButton handleClick={() => setAddOpen(true)}/>
                    </Can>
                }
                <SearchIconButton handleClick={() => setFilterOpen(true)}/>
            </PageHeader>
            <EnhancedTable columns={columns} 
                data={data} setData={setData}
                getDataFnc={getDataFnc} 
                filters={filters}
                lastUpdate={lastUpdate}
                handleEdit={editSchema && handleEdit}
            />
            {
                searchSchema &&
                <SearchDialog 
                    modelTitle={_modelTitle} 
                    schema={searchSchema} 
                    values={filters}
                    open={filterOpen} 
                    handleClose={() => setFilterOpen(false)} 
                    handleSubmit={handleSubmitFilters}
                />
            }
            {
                addSchema && 
                <EditDialog 
                    modelTitle={_modelTitle} 
                    schema={addSchema}
                    open={addOpen}
                    values={addValues}
                    action='add'
                    editFnc={addFnc}
                    handleClose={() => setAddOpen(false)}
                    handleSubmit={handleUpdate}
                />
            }
            {
                editSchema &&
                <EditDialog 
                    modelTitle={_modelTitle}
                    schema={editSchema}
                    open={updateOpen}
                    values={selected}
                    getFnc={getFnc}
                    rowId={rowId}
                    action='update'
                    editFnc={editFnc}
                    handleClose={() => setUpdateOpen(false)}
                    handleSubmit={handleUpdate}
                />
            }
        </Fragment>
    );
}
 
export default ReportPage;