export interface ScriptUiConfigKVPair {
    name: string,
    type: string, //"text", "number", later ("flag", "selector")
    value: number | string,
}


export interface ScriptUiConfigInput extends ScriptUiConfigKVPair {
    options?: ScriptUiConfigKVPair[],

}

export interface ScriptUiConfigVariable extends ScriptUiConfigKVPair {

}

export interface ScriptUiConfigObject {
    title: string,
    desc: string,
    // variables: UiConfigVariable[],
    inputs: ScriptUiConfigInput[],
    cmd: string,
}

export interface ScriptUiConfigStoreItem {
    id: string,
    name: string,
    desc: string,
    title: string,
}

export interface DialogData {
    title: string;
    message: string;
}

export interface AuthUserCredential {
    email: string,
    password: string,
}
