const sortMessages = (messages, userId) => {
  const dialogues = {}
  const handlePush = (user, msg) => {
    if (!dialogues[user]) dialogues[user] = []
    dialogues[user].push(msg)
  }
  for (let msg of messages) {
    const sender = msg.sender.toString()
    const recipient = msg.recipient.toString()
    handlePush(sender !== userId ? sender : recipient, msg)
  }
  return dialogues
}

export default sortMessages