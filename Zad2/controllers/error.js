module.exports = {
    getNotFoundPage: (req, res) => {
      res.status(404).render('not-found', { title: 'Page not found' });
    }
  };