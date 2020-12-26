const mapUserData = async (user = {}) => {
  const { uid, email } = user
  const token = await user.getIdToken(true)

  return {
    uid,
    email,
    token,
  }
}

export default mapUserData
