import { 
    checkIfValid
} from '../actions/user-actions'

export function mapStateToProps(state){
    return {
        user: state.user
    }
}

export const mapDispatchToProps = { checkIfValid }