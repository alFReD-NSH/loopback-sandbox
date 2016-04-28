require('longjohn');
module.exports = function(server, cb) {
  Error.stackTraceLimit = 200;
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */
  var ds = server.dataSources.db;
  ds.autoupdate(function(er) {
    if (er) {
      console.error(er);
      throw er;
    }
    console.log('Looback tables created in ', ds.adapter.name);
    server.models.Faculty.create({})
      .then(faculty => faculty.lecturers.create({ name: 'B' }))
      .then(lecturer => lecturer.courses.create({ name: 'A'}, cb))
      .catch(cb);
  });
};
