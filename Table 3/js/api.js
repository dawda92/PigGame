async function getDataResults(id) {
  try {
    // await response of the fetch calls
    const response = await fetch(`http://assignment.siteimprove.com/api/persons`);
    // Only proceed once its resolved
    const data = await response.json();
  
    const childrenResponse = await fetch(`http://assignment.siteimprove.com/api/persondetails/${id}`)
    const childrenData = await childrenResponse.json();
    
    // Only proceed once second promise is resolved
    return {
      mainUser: data,
      subUser: childrenData
    };
  } catch(error) {
    console.log(error);
  }
}
