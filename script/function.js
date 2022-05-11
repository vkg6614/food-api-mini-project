async function getData(url, n) {
  var res = await fetch(url);
  var data = await res.json();
  return data;
}
export default getData;
