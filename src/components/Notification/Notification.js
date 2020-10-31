// @ts-nocheck
import { notification } from "antd";

export const showNotification = (type, { message, description }) => {
    notification[type]({
      message,
      description,
      placement: 'bottomRight'
    });
};

export const showSuccessNotification = (params) => showNotification('success', params)
export const showErrorNotification = (params) => showNotification('error', { message: params.message || 'Error', description: params.description || 'Something went wrong!' })

