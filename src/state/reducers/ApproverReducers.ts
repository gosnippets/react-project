import { approverConstants, ApproverDispatchTypes, ApproverType } from '../types';

interface IApprover {
  loading: boolean,
  approver?: ApproverType,
  isError?: boolean,
  error?: string
}

const defaultapprover: IApprover = {
  loading: false
};

const approverReducer = (state: IApprover = defaultapprover, action: ApproverDispatchTypes): IApprover => {
  switch (action.type) {
    case approverConstants.APPROVER_LOADING:
      return {
        loading: true,
      }
    case approverConstants.APPROVER_SUCCESS:
      return {
        loading: false,
        approver: action.payload
      }
    case approverConstants.APPROVER_FAIL:
      return {
        loading: false,
        isError:true,
        error:action.error
      }
    default:
      return state
  }
};


export default approverReducer;