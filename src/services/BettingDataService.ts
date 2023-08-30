import http from "../http-common";
import axios, { AxiosError } from "axios";

type ErrorType = {
    message: string
}

interface ResponseBody {
    data: any;
    code: number;
    errors: Array<ErrorType>;
}

class BettingDataService {

    private async post(url: string, data: any): Promise<ResponseBody> {
        var rb: ResponseBody
        try {
            const response = await http.post(url, data);
            rb = { data: response.data, code: response.status };
        } catch (err: any | AxiosError) {
            if (axios.isAxiosError(err) && err.response) {
                if (typeof err.response.data == 'string') {
                    rb = { data: null, code: err.response.status, errors: [{ message: err.response.data }] };
                } else {
                    rb = { errors: [{ message: err.response.data }] };
                }
            } else {
                rb = { data: null, code: 500, errors: [{ message: err.message }] };
            }
        }

        if (rb.errors == undefined) {
            rb.errors = [];
        }

        return rb
    }

    private async put(url: string, data: any): Promise<ResponseBody> {
            var rb: ResponseBody
        try {
            const response = await http.put(url, data);
            rb = { data: response.data, code: response.status };
        } catch (err: any | AxiosError) {
            if (axios.isAxiosError(err) && err.response) {
                if (typeof err.response.data == 'string') {
                    rb = { data: null, code: err.response.status, errors: [{ message: err.response.data }] };
                } else {
                    rb = { errors: [{ message: err.response.data }] };
                }
            } else {
                rb = { data: null, code: 500, errors: [{ message: err.message }] };
            }
        }

        if (rb.errors == undefined) {
            rb.errors = [];
        }

        return rb
    }

    private async get(url: string): Promise<ResponseBody> {
        var rb: ResponseBody
        try {
            const response = await http.get(url);
            rb = { data: response.data, code: response.status };
        } catch (err: any | AxiosError) {
            if (axios.isAxiosError(err) && err.response) {
                if (typeof err.response.data == 'string') {
                    rb = { data: null, code: err.response.status, errors: [{ message: err.response.data }] };
                } else {
                    rb = { errors: [{ message: err.response.data }] };
                }
            } else {
                rb = { data: null, code: 500, errors: [{ message: err.message }] };
            }
        }

        if (rb.errors == undefined) {
            rb.errors = [];
        }

        return rb
    }
    
    public async getLoginToken(creds: any): Promise<String> {
        return await (await this.post(`/api/v1/auth/login`, creds)).data.token;
    }
    
    public async fetchTeams(): Promise<any> {
        return await (await this.get(`/api/teams`)).data;
    }

    public async fetchGames(date: any): Promise<any> {
        return await (await this.get(`/api/games/${date}`)).data;
    }   

    public async fetchTiebreaker(date: any): Promise<any> {
        return await (await this.get(`/api/tiebreaker/inquiry/${date}`)).data;
    }
};


export default new BettingDataService();