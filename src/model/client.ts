import { action, observable, useStrict, transaction } from "mobx";
useStrict(true);


export interface IClientView {
    isLoading: boolean
    isTableLoading: boolean
    tableData: Array<IClient>
    tableDataAction(tableData: Array<IClient>): void
    tableLoadingAction(isLoading: boolean): void

    createModalVisible: boolean
    createModalConfirmLoading: boolean
    createModalVisibleAction(is: boolean): void
    createModalConfirmLoadingAction(is: boolean): void
    createModalAction(isVisible: boolean, isLoad: boolean): void

    oneTableDataAction(tableData: IClient, isTableLoading: boolean): void
    notFoundTableDataAction(isTableLoading: boolean): void

}

export declare type IClient = {
    Id?: string,
    ClientId?: string,
    Name?: string,
    Secret?: string,
    VerifySecret?: string,
    Locked?: number

}

class Client {
    @observable isTableLoading: boolean = false;
    @observable isLoading: boolean = false;
    @observable tableData: Array<IClient>;
    @observable createModalVisible: boolean = false;
    @observable createModalConfirmLoading: boolean = false;

    @action tableLoadingAction(isLoading: boolean): void {
        this.isTableLoading = isLoading;

    }

    @action tableDataAction(tableData: Array<IClient>): void {
        this.tableData = tableData;

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


    @action oneTableDataAction(tableData: IClient,isTableLoading: boolean): void {
        transaction(() => {
            this.tableData = [];
            this.tableData.push(tableData);
            this.isTableLoading = isTableLoading;
        });

    }

    @action notFoundTableDataAction(isTableLoading: boolean): void {
        transaction(() => {
            this.tableData = [];
            this.isTableLoading = isTableLoading;
        });

    }


}


export default new Client();