import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from "../redux/authSlice";
import DataTable from 'react-data-table-component';

const StudentLicense = () => {
    const dispatch = useDispatch();

    // Fetch user data on component mount
    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    const { userData, loading, error } = useSelector((state) => state.auth);

    // Define columns for the DataTable
    const columns = [
        {
            name: 'Subscription Start Date',
            selector: row => row.subscriptionStartDate,
            sortable: true,
        },
        {
            name: 'Subscription Expiry Date',
            selector: row => row.subscriptionExpiryDate,
            sortable: true,
        },
        {
            name: 'Subscription Status',
            cell: row => row.subscriptionExpiryDate ? 'Active' : 'Inactive',
            sortable: true,
        },
    ];

    // Format data for DataTable
    const tableData = userData && userData.subscriptionStartDate && userData.subscriptionExpiryDate
        ? [userData] // DataTable expects an array, so we wrap the userData in an array
        : [];

    return (
        <>
            <div className="dashboard__content__wraper">
                <div className="dashboard__section__title">
                    <h4>Student License</h4>
                </div>
                {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <DataTable
                    columns={columns}
                    data={tableData}
                    noDataComponent="No Active Subscription"
                    pagination
                />
            )}
            </div>

          
        </>
    );
};

export default StudentLicense;
