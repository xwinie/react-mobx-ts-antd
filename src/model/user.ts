import {action, observable, transaction, useStrict} from "mobx";
import { IRole } from "./role";
useStrict(true);

export interface IUserView {
    pagination: any
    isLoading: boolean
    isTableLoading: boolean
    updateModalVisible: boolean
    updateModalConfirmLoading: boolean
    initialUpdateValue: any
    tableData: Array<IUser>
    createModalVisible: boolean
    createModalConfirmLoading: boolean
    tableDataAction(tableData: Array<IUser>, pagination: any, isTableLoading: boolean): void
    tableLoadingAction(isTableLoading: boolean): void
    oneTableDataAction(tableData: IUser, pagination: any, isTableLoading: boolean): void
    notFoundTableDataAction(pagination: any, isTableLoading: boolean): void
    updateModalVisibleAction(is: boolean): void
    updateModalConfirmLoadingAction(is: boolean): void
    updateModalAction(isVisible: boolean, isLoad: boolean): void
    createModalVisibleAction(is: boolean): void
    createModalConfirmLoadingAction(is: boolean): void
    createModalAction(isVisible: boolean, isLoad: boolean): void
    loadingAction(isLoad: boolean): void
    initialUpdateValueAction(data: IUser): void

    selectedModalVisible: boolean
    selectedConfirmLoading: boolean
    selectedData: Array<string>
    selectUserId: string
    roleData: Array<IRole>
    selectedModalVisibleAction(is: boolean): void 
    selectedModalAction(isVisible: boolean, isLoad: boolean): void
    roleDataAction(data: Array<IRole>): void
    selectedModalConfirmLoadingAction(is: boolean): void
    selectedDataAction(data: Array<string>): void 
    selectedUserIdAction(id: string): void
    
}


export declare type  IUser = {
    Id?: string,
    Account?: string,
    Name?: string,
    UserType?: number,
    DeleteStatus?: number,
    Created?: string,
    Updated?: string,
    Password?: string,
    Locked?: number

}

class User {

    @observable isLoading: boolean = false;
    @observable isTableLoading: boolean = false;
    // table 分页
    @observable pagination: any = {
        total: 0,
        showTotal: (total: number) => `共${total}条记录`,
        pageSize: 10,
        current: 1
    };

    @observable tableData: Array<IUser>;
    // update modal
    @observable updateModalVisible: boolean = false;
    @observable updateModalConfirmLoading: boolean = false;
    @observable initialUpdateValue: IUser;
    @observable createModalVisible: boolean = false;
    @observable createModalConfirmLoading: boolean = false;

    @observable selectedModalVisible: boolean = false;
    @observable selectedConfirmLoading: boolean = false;
    @observable selectedData: Array<string>;
    @observable selectUserId: string;
    @observable roleData: Array<IRole>;

    @action tableLoadingAction(isTableLoading: boolean): void {
        this.isTableLoading = isTableLoading;

    }

    @action tableDataAction(tableData: Array<IUser>, pagination: any, isTableLoading: boolean): void {
        transaction(() => {
            this.tableData = tableData;
            this.pagination = pagination;
            this.isTableLoading = isTableLoading;
        });

    }

    @action oneTableDataAction(tableData: IUser, pagination: any, isTableLoading: boolean): void {
        transaction(() => {
            this.tableData = [];
            this.tableData.push(tableData);
            this.pagination = pagination;
            this.isTableLoading = isTableLoading;
        });

    }

    @action notFoundTableDataAction(pagination: any, isTableLoading: boolean): void {
        transaction(() => {
            this.tableData = [];
            this.pagination = pagination;
            this.isTableLoading = isTableLoading;
        });

    }

    @action updateModalVisibleAction(is: boolean): void {
        this.updateModalVisible = is;

    }

    @action updateModalConfirmLoadingAction(is: boolean): void {
        this.updateModalConfirmLoading = is;

    }

    @action updateModalAction(isVisible: boolean, isLoad: boolean): void {
        transaction(() => {
            this.updateModalConfirmLoading = isLoad;
            this.updateModalVisible = isVisible;
        });
    }

    @action createModalVisibleAction(is: boolean): void {
        this.createModalVisible = is;

    }

    @action createModalConfirmLoadingAction(is: boolean): void {
        this.createModalConfirmLoading = is;

    }

    @action createModalAction(isVisible: boolean, isLoad: boolean): void {
        transaction(() => {
            this.createModalConfirmLoading = isLoad;
            this.createModalVisible = isVisible;
        });
    }


    @action loadingAction(isLoad: boolean): void {
        this.isLoading = isLoad;
    }

    @action initialUpdateValueAction(data: IUser): void {
        this.initialUpdateValue = data;

    }

    @action selectedModalVisibleAction(is: boolean): void {
        this.selectedModalVisible = is;

    }

    @action selectedModalConfirmLoadingAction(is: boolean): void {
        this.selectedConfirmLoading = is;

    }

    @action selectedModalAction(isVisible: boolean, isLoad: boolean): void {
        transaction(() => {
            this.selectedConfirmLoading = isLoad;
            this.selectedModalVisible = isVisible;
        });
    }

    @action roleDataAction(data: Array<IRole>): void {
        this.roleData = data;
    }

    @action selectedDataAction(data: Array<string>): void {
        this.selectedData = data;
    }

    @action selectedUserIdAction(id: string): void {
        this.selectUserId = id;
    }

}

export  default new User();