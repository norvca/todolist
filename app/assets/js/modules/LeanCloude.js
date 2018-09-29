import AV from 'leancloud-storage'
var APP_ID = 'vnMy7aS5LVDjun5eDjp3EN4d-gzGzoHsz';
var APP_KEY = 'KMGqhnw5lQP4dXq9mVz5P962';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})

export default AV