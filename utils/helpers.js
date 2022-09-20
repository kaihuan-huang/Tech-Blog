module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return `${date.getMontn() +1 }/${date.getDate()}/${date.getFullYear()}`;
  }
};
