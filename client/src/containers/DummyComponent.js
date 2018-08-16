import React, { Component } from 'react';

import PageHeader from '../components/PageHeader';
import { showSpinner, hideSpinner } from '../actions/UIActions';
import testStore from '../stores/TestStore';

class DummyCompoenent extends Component {
    render(){
        return (
            <div>
                <PageHeader title="Private route" />
                <button onClick={showSpinner}>Show spinner</button>
                <button onClick={hideSpinner}>Hide spinner</button>
            </div>
        )
    }
}
export default DummyCompoenent;