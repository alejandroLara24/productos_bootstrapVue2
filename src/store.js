const store = {
    debug: true,
    state: {
        messages: [],
    },
    addMessageAction(newMessage) {
        if (this.debug) console.log('setMessageAction triggered with', newMessage)
        this.state.messages.push(newMessage)
    },
    delMessageAction(index) {
        if (this.debug) console.log('clearMessageAction triggered with index', index)
        this.state.messages.splice(index,1)
    }
}

export default store