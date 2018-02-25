import { action, observable, transaction, useStrict } from "mobx";
useStrict(true);
export interface IRoleView {
    pagination: any
    isLoading: boolean
    isTableLoading: boolean
    updateModalVisible: boolean
    updateModalConfirmLoading: boolean
    initialUpdateValue: any
    tableData: Array<IRole>
    createModalVisible: boolean
    createModalConfirmLoading: boolean
    selectedModalVisible: boolean
    selectedConfirmLoading: boolean
    selectedData: Array<string>
    resourceData: Array<IResource>
    selectRoleId: string
    tableDataAction(tableData: Array<IRole>, pagination: any, isTableLoading: boolean): void
    tableLoadingAction(isTableLoading: boolean): void
    oneTableDataAction(tableData: IRole, pagination: any, isTableLoading: boolean): void
    notFoundTableDataAction(pagination: any, isTableLoading: boolean): void
    updateModalVisibleAction(is: boolean): void
    updateModalConfirmLoadingAction(is: boolean): void
    updateModalAction(isVisible: boolean, isLoad: boolean): void
    createModalVisibleAction(is: boolean): void
    createModalConfirmLoadingAction(is: boolean): void
    createModalAction(isVisible: boolean, isLoad: boolean): void
    loadingAction(isLoad: boolean): void
    initialUpdateValueAction(data: IRole): void
    selectedModalVisibleAction(is: boolean): void
    selectedModalConfirmLoadingAction(is: boolean): void
    selectedModalAction(isVisible: boolean, isLoad: boolean): void
    resourceDataAction(data: Array<IResource>): void
    selectedDataAction(data: Array<string>): void
    selectedRoleIdAction(id: string): void
    oneResourceDataAction(tableData: IResource, isTableLoading: boolean): void
    notFoundResourceDataAction(isTableLoading: boolean): void
}


export declare type IRole = {
    Id?: string,
    Code?: string,
    Name?: string,
    Description?: string,
    DeleteStatus?: number,
    Created?: string,
    Updated?: string,
    Locked?: number

}

export declare type IResource = {
    Id?: string,
    Code?: string,
    Name?: string,
    ResType?: number,
    IsOpen?: number,
    DeleteStatus?: number,
    Created?: string,
    Updated?: string,
    Locked?: number

}

class Role {

    @observable isLoading: boolean = false;
    @observable isTableLoading: boolean = false;
    // table 分页
    @observable pagination: any = {
        total: 0,
        showTotal: (total: number) => `共${total}条记录`,
        pageSize: 10,
        current: 1
    };

    @observable tableData: Array<IRole>;
    // update modal
    @observable updateModalVisible: boolean = false;
    @observable updateModalConfirmLoading: boolean = false;
    @observable initialUpdateValue: IRole;
    @observable selectedModalVisible: boolean = false;
    @observable selectedConfirmLoading: boolean = false;
    @observable selectedData: Array<string>;
    @observable selectRoleId: string;
    @observable resourceData: Array<IResource>;
    @observable createModalVisible: boolean = false;
    @observable createModalConfirmLoading: boolean = false;


    @action tableLoadingAction(isTableLoading: boolean): void {
        this.isTableLoading = isTableLoading;

    }

    @action tableDataAction(tableData: Array<IRole>, pagination: any, isTableLoading: boolean): void {
        transaction(() => {
            this.tableData = tableData;
            this.pagination = pagination;
            this.isTableLoading = isTableLoading;
        });

    }

    @action oneTableDataAction(tableData: IRole, pagination: any, isTableLoading: boolean): void {
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

    @action oneResourceDataAction(tableData: IResource, isTableLoading: boolean): void {
        transaction(() => {
            this.resourceData = [];
            this.resourceData.push(tableData);
            this.isTableLoading = isTableLoading;
        });

    }

    @action notFoundResourceDataAction(isTableLoading: boolean): void {
        transaction(() => {
            this.resourceData = [];
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

    @action loadingAction(isLoad: boolean): void {
        this.isLoading = isLoad;
    }

    @action initialUpdateValueAction(data: IRole): void {
        this.initialUpdateValue = data;

    }

    @action resourceDataAction(data: Array<IResource>): void {
        this.resourceData = data;
    }

    @action selectedDataAction(data: Array<string>): void {
        this.selectedData = data;
    }

    @action selectedRoleIdAction(id: string): void {
        this.selectRoleId = id;
    }


}

export default new Role();