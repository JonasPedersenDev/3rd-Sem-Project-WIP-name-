import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BookingDate from "../../modelInterfaces/BookingDate";
import { isBeforeToday, isWeekend } from "../../../utils/BookingSupport";
import ApiService from "../../../utils/ApiService";
import Resource from "../../modelInterfaces/Resource";
import Tenant from "../../modelInterfaces/Tenant";

interface BookForTenantProps {
    bookedDates: BookingDate[];
    onDateChange: (start: Date | null, end: Date | null) => void;
    resourceCapacity: number;
}

const BookForTenant: React.FC<BookForTenantProps> = ({
    bookedDates,
    onDateChange,
    resourceCapacity,
}) => {
    const [selectedStart, setSelectedStart] = useState<Date | null>(null);
    const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
    const [resources, setResources] = useState<Resource[]>([]);
    const [users, setUsers] = useState<Tenant[]>([]);
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
    const [selectedUser, setSelectedUser] = useState<Tenant | null>(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await ApiService.fetchData("tool/get-all");
                setResources(response.data as Resource[]);
            } catch (error) {
                console.error("Failed to fetch resources:", error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await ApiService.fetchData("admin/getAllTenants");
                setUsers(response.data as Tenant[]);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchResources();
        fetchUsers();
    }, []);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isBooked = (date: Date) => {
        const booked = bookedDates.find(
            (booked) => new Date(booked.date).toDateString() === date.toDateString()
        );
        return booked ? booked.amount >= resourceCapacity : false;
    };

    const isInRange = (date: Date) => {
        return (
            selectedStart &&
            selectedEnd &&
            date >= selectedStart &&
            date < selectedEnd
        );
    };

    const handleDateClick = (date: Date) => {
        if (!selectedStart || (selectedStart && selectedEnd)) {
            setSelectedStart(date);
            setSelectedEnd(null);
            onDateChange(date, null);
        } else {
            if (date > selectedStart) {
                setSelectedEnd(date);
                onDateChange(selectedStart, date);
            } else {
                setSelectedStart(date);
                setSelectedEnd(null);
                onDateChange(date, null);
            }
        }
    };

    const handleBooking = () => {
        if (selectedResource && selectedUser && selectedStart && selectedEnd) {
            console.log("Booking:", {
                resource: selectedResource,
                user: selectedUser,
                start: selectedStart,
                end: selectedEnd,
            });
        }
    };

    return (
        <div className="calendar-wrapper">
            <div className="dropdowns">
                <select
                    value={selectedResource?.id || ""}
                    onChange={(e) =>
                        setSelectedResource(resources.find((resource) => resource.id === Number(e.target.value)) || null)
                    }
                >
                    <option value="">Select Resource</option>
                    {resources.map((resource) => (
                        <option key={resource.id} value={resource.id}>
                            {resource.name}
                        </option>
                    ))}
                </select>
                {/*
                                <select
                                    value={selectedUser?.id || ""}
                                    onChange={(e) =>
                                        setSelectedUser(users.find((user) => user.id === Number(e.target.value)) || null)
                                    }
                                >
                                    <option value="">Select User</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                */}
            </div>
            <Calendar
                tileClassName={({ date }) => {
                    if (isWeekend(date)) {
                        return "weekend-tile";
                    }
                    if (isBeforeToday(date)) {
                        return "unavailable-tile";
                    }
                    if (isBooked(date)) {
                        return "booked-tile";
                    }
                    if (isInRange(date)) {
                        return "range-tile";
                    }
                    return "free-tile";
                }}
                onClickDay={handleDateClick}
                tileDisabled={({ date }) => isBeforeToday(date)}
            />
            <div className="calendar-legend">
                <div className="legend-item">
                    <span className="legend-color booked-color"></span>
                    <span>Reserveret</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color range-color"></span>
                    <span>Valgt periode</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color currentday-color"></span>
                    <span> Dags dato</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color unavailable-color"></span>
                    <span>Weekend (Kan ikke reserveres)</span>
                </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleBooking} disabled={!selectedResource || !selectedUser || !selectedStart || !selectedEnd}>
                Book
            </button>
        </div>
    );
};

export default BookForTenant;