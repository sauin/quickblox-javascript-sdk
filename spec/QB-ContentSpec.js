var REST_REQUESTS_TIMEOUT = 3000;

describe('Content API', function() {
  var token,
      data = {};

  // beforeAll
  //
  beforeAll(function(done){
    QB.init(CREDENTIALS.appId, CREDENTIALS.authKey, CREDENTIALS.authSecret);

    QB.createSession(QBUser1, function(err, session) {
      if (err) {
        done.fail("Create session error: " + JSON.stringify(err));
      } else {
        expect(session).not.toBeNull();
        token = session.token;

        done();
      }
    });
  }, REST_REQUESTS_TIMEOUT);

  it('can create and upload files', function(done) {
    var d = new Date(2015, 10, 13, 14, 30, 30, 600),
        genFile = new File(["Hello QuickBlox"], "QB.txt", {type: "text/plain", lastModified: d});

    data = {name: genFile.name, file: genFile, type: genFile.type, size: genFile.size, public: false};

    QB.content.createAndUpload(data, function(err, res) {
      if (err) {
        done.fail("Create and upload files error: " + JSON.stringify(err));
      }else{
        expect(res).not.toBeNull();
        expect(res.name).toBe('QB.txt');
        console.info('can create and upload files');
        done();
      }
    });
  }, 5000);

  it('can list content objects', function(done) {
    QB.content.list(function(err, res) {
      if (err) {
        done.fail("List content objects error: " + JSON.stringify(err));
      }else{
        expect(res).not.toBeNull();
        expect(res.items.length).toBeGreaterThan(0);
        console.info('can list content objects');
        done();
      }
    });
  }, REST_REQUESTS_TIMEOUT);

  it('can delete content objects', function(done) {
    QB.content.createAndUpload(data, function(err, response) {
      if (err) {
        done.fail("Create and upload files error: " + JSON.stringify(err));
      }else{
        var elemId = response.id;
        QB.content.delete(elemId, function(err, result) {
          if (err) {
            done.fail("Delete content objects error: " + JSON.stringify(err));
          }else{
            expect(result).toEqual(true);
            console.info('can delete content objects');
            done();
          }
        });
      }
    });
  }, 7000);

  it('can get file information by ID', function(done) {
    QB.content.getInfo(2917985, function(err, res) {
      if (err) {
        done.fail("Get file information by ID error: " + JSON.stringify(err));
      }else{
        expect(res).not.toBeNull();
        expect(res.blob.id).toEqual(2917985);
        expect(res.blob.size).toBe(15);
        console.info('can get file information by ID');

        done();
      }
    });
  }, REST_REQUESTS_TIMEOUT);

  // Private Url
  //
  it('can access private URL', function() {
    var fileUID = "97f5802dcbd34a59a4921d73f6baedd000",
        privateURL = QB.content.privateUrl(fileUID);

    expect(privateURL).toBe("https://api.quickblox.com/blobs/97f5802dcbd34a59a4921d73f6baedd000?token="+token);
    console.info('can access private URL');
  });

  // Public Url
  //
  it('can access public URL', function() {
    var fileUID = "97f5802dcbd34a59a4921d73f6baedd000",
        publicUrl = QB.content.publicUrl(fileUID);

    expect(publicUrl).toEqual("https://api.quickblox.com/blobs/97f5802dcbd34a59a4921d73f6baedd000");
  });
});
