import { CrudFilters, DataProvider, HttpError } from "@pankod/refine-core";
import { stringify } from "querystring";
import axios from "axios";

// Error handling with axios interceptors
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        };
         return Promise.reject(customError);
    },
);

export const dataProvider  = (apiUrl: string): DataProvider => ({
    //methods
    
    getList: async ({resource}) => {
        const url = `${apiUrl}/${resource}`;

        const { current = 1, pageSize = 10} = pagination ?? {};

        const query: {
            _start?: number;
            _end?: number;
            _sort?: string;
            _order?: string;
        } = {
            _start: (current - 1) * pageSize,
            _end: current * pageSize,
        };

        if (sort && sort.length > 0) {
            query._sort = sort[0].field;
            query._order = sort[0].order;
          }

            

        const { data, headers } = await axiosInstance.get(`${url}?${stringify(query)}`);

        const total = headers["x-total-count"];

        return {
            data,
            total,
        };
    },


});