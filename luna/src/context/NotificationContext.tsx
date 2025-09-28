import { createContext, useContext, useState, type ReactNode, useEffect } from "react";

//Creating a Notification object type.
type Notification = {id:string; message:string}

//Creating a Notification context type
type NotificationContextType = {
    notifications: Notification[];
    addNotification: (message: string) => void;
    removeNotification: (id:string) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({children}: {children: ReactNode}) =>{
    //Creates a useState with a function that returns an array based on the "notifications lkept in the local storage"
    const[notifications, setNotifications] = useState<Notification[]>(() => {
        const saved = localStorage.getItem("notifications");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        //Adds the passed notifications into the local storage
        localStorage.setItem("notifications", JSON.stringify(notifications))
    }, [notifications]);

    const addNotification = (message: string) => {
        const id = Date.now().toString();
        //Adds a new notification message along with the previos entries.
        setNotifications((prev) => [...prev, {id, message}]);
    };

    const removeNotification = (id: string) =>{
        //Removes the notification with the id passed in the parameter by filtering it out.
        setNotifications((prev)=> prev.filter((n) => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{notifications, addNotification,removeNotification}}>
            {children}
        </NotificationContext.Provider>
    );


};

export const useNotifications = () => {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error("useNotifications must be used inside of NotificationProvider");
    return ctx;
}
