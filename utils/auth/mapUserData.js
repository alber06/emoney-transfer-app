const mapUserData = async (user = {}) => {
  const { uid, email } = user
  const token = user.getIdToken ? await user.getIdToken(true) : null

  return {
    uid,
    email,
    token,
  }
}

export default mapUserData
