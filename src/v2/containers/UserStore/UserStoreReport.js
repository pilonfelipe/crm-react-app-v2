import React from 'react';
import ReportPage from '../../components/ReportPage';
import { get_User_Stores } from '../../../services/User';

const title = 'User Stores';
const modelName = 'UserStore';
const modelTitle = 'User Store';
const rowId = 'user_store_id';

const searchSchema = {
    fieldGroups: [
        {
            key: 'main',
            fields: [
                { key: 'store_code', title: 'Store Code' },
                { key: 'store_name', title: 'Store Name' }
            ]
        }
    ]
}

const addSchema = {
    fieldGroups: [
        {
            key: 'main',
            fields: [
                { key: 'email', title: 'Email', required: true },
                { key: 'store_code', title: 'Store', required: true }
            ]
        }
    ]
}

const editSchema = {
    fieldGroups: [
        {
            key: 'main',
            fields: [
                { key: 'email', title: 'Email', required: true },
                { key: 'store_code', title: 'Store', required: true }
            ]
        }
    ]
}
 
const columns = [
    { key: 'email', title: 'Email' },
    { key: 'user_name', title: 'User Name' },
    { key: 'store_code', title: 'Store Code' },
    { key: 'store_name', title: 'Store Name' },
    { key: 'created_at', title: 'Created At', comp: 'datetime' },
    { key: 'updated_at', title: 'Updated At', comp: 'datetime' },
    { key: 'updated_by', title: 'Updated By' }
]


const UserStoreReport = () => {
    return (
        <ReportPage title={title} modelName={modelName} modelTitle={modelTitle}
            columns={columns} getDataFnc={get_User_Stores} searchSchema={searchSchema}
            //addSchema={addSchema} addFnc={post_StoreGroup}
            //editSchema={editSchema} editFnc={put_StoreGroup}
            //getFnc={get_StoreGroup} rowId={rowId}
        />
    );
}
 
export default UserStoreReport;