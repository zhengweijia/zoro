import React from 'react';

export default class Child extends React.Component {
  tid = null;

  constructor(p) {
     super(p);

     this.state = {
       date: new Date(),
     }
   }

   componentDidMount() {
    this.tid = setInterval(()=>{
      this.setState({
        date: new Date(),
      });
    }, 1000)
   }

   componentWillUnmount() {
     if(this.tid) {
       clearInterval(this.tid);
     }
   }

   render() {
    return (
      <div>{this.state.date.toLocaleTimeString()}</div>
    );
   }

}

