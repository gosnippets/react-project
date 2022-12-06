export const approverConstants = {
  APPROVER_LOADING: "APPROVER_LOADING",
  APPROVER_SUCCESS: "APPROVER_SUCCESS",
  APPROVER_FAIL: "APPROVER_FAIL",
};

export type ApproverType = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  department: object,
  role: object,
  active: boolean
}

export interface ApproverLoading {
  type: typeof approverConstants.APPROVER_LOADING
  payload?: ApproverType
  error?:string
}

export interface ApproverSuccess {
  type: typeof approverConstants.APPROVER_SUCCESS,
  payload: ApproverType
  error?:string
}

export interface ApproverFail {
  type: typeof approverConstants.APPROVER_FAIL
  payload?: ApproverType
  error:string
}

export type ApproverDispatchTypes = ApproverLoading | ApproverSuccess | ApproverFail 