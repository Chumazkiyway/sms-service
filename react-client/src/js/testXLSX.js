import XLSX from 'xlsx';
export function xlsxRead(){
	let workbook = XLSX.readFile('../src/clients.xlsx');
	var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
	var data = XLSX.utils.sheet_to_json(first_worksheet, {header:1});
	console.log(data);
	return data;
}
xlsxRead();