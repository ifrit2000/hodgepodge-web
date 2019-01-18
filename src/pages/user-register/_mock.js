export default {
  'POST /api/user-register/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
};
