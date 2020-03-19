import { toHex } from '../utils/hex-encode';
import PouchDB from 'pouchdb';

function dbSync(db, username, token) {
  const dbName = `userdb-${toHex(username)}`;

  let remoteDB = new PouchDB('http://192.168.206.141:4000', {
    fetch: function(url, opts) {
      opts.headers.set('X-Auth-CouchDB-Token', token);
      opts.headers.set('X-CouchDB-dbName', dbName);
      opts.credentials = 'omit';
      return PouchDB.fetch(url, opts);
    },
    skip_setup: true
  });

  PouchDB.sync(db, remoteDB, {
    live: true,
    heartbeat: false,
    timeout: false,
    retry: true
  });
}

export { dbSync };
