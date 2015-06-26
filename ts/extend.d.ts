
declare module angular {

    interface IPromise<T> {
        then(Function): IPromise<any>;
        then(success: Function, Function): IPromise<any>;
        then(success: Function, error: Function, Function): IPromise<any>;
        catch(Function): IPromise<any>;
        finally(Function): IPromise<any>;
    }

}

interface Reflect {
    decorate(decorators: any[], target: any, key: any, desc: any): any;
}

declare var Reflect: Reflect;