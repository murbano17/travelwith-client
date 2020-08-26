import React, { Component } from 'react'
import { withAuth } from '../lib/Services/AuthProvider';

class NotificationPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingInvitationList: this.props.user.pendingInvitation

        }
    }

    



    
    render() {
        console.log('PROPS', this.state.pendingInvitationList)
        return (
            <div>
                <ul>
                    {}
                </ul>
            </div>
        
            
          
        )
    }
}

export default withAuth(NotificationPanel)
