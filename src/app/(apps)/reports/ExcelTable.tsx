'use client';

import { useState } from "react";
import ExcelJS from 'exceljs';

const originNameIndex: number = 3;
const originPriceIndex: number = 18;

const cloudTitleIndex: number = 1;
const cloudPriceIndex: number = 2;

const _originExcel = (rowData: ExcelJS.Row, rowNumber: number, excelData: any) => {
    if (rowNumber <= 10 && rowData.hidden) return;

    const collumns: any = [];
    rowData.eachCell((cell, colNumber: number) => {
        if (collumns.length < colNumber - 1) {
            for (let i = collumns.length; i < colNumber - 1; i++) {
                collumns[i] = collumns[i] || '';
            }
        }
        if (typeof cell.value === 'object') collumns.push(cell.text);
        else collumns.push(cell.value);
    });
    if (!excelData.header.length) {
        excelData.header = collumns;
    } else {
        if (!excelData.list) excelData.list = [];
        excelData.list.push(collumns);
    };
};

const _cloudExcel = (rowData: ExcelJS.Row, rowNumber: number, excelData: any) => {
    if (rowData.hidden) return;

    const collumns: any = [];
    rowData.eachCell((cell, colNumber: number) => {
        if (collumns.length < colNumber - 1) {
            for (let i = collumns.length; i < colNumber - 1; i++) {
                collumns[i] = collumns[i] || '';
            }
        }
        if (typeof cell.value === 'object') collumns.push(cell.text);
        else collumns.push(cell.value);
    });
    if (!excelData.header.length) {
        excelData.header = collumns;
    } else {
        if (!excelData.list) excelData.list = [];
        excelData.list.push(collumns);
    }
};

const _verify = (jsonDatas: any[]) => {
    const originData = jsonDatas.find(item => item.type === 'origin');
    const cloudData = jsonDatas.find(item => item.type === 'cloud');

    const summary = originData.list.reduce((acc: { [key: string]: number }, curr: any[] ) => {
        const key: string = curr[originNameIndex];
        if(!key) return acc;

        if (!acc[key]) acc[key] = parseFloat(curr[originPriceIndex]);
        else acc[key] += parseFloat(curr[originPriceIndex]);
        return acc;
    }, {});

    for (const name in summary) {
        const _cloud = cloudData.list.filter((item: any[]) => item[cloudTitleIndex].includes(name));
        const expense = _cloud.reduce((acc: number, curr: any[]) => acc + parseFloat(curr[cloudPriceIndex]), 0);
        const flag = _cloud.length === 0 ? '❌' : summary[name] == expense ? '✅' : '⚠️';
        _cloud.forEach((ele: any[]) => ele[cloudTitleIndex] = `(${flag} ${name})${ele[cloudTitleIndex]}`);

        originData.list.forEach((item: any[]) => {
            if(item[originNameIndex] === name) item[originNameIndex] = `${flag} ${name}`;
        });
    }

    const rowColors = ['FFFFFF00', 'FFFF00FF', 'FFFFFFFF'];
    const workbook = new ExcelJS.Workbook();
    for( const jsonData of jsonDatas) {
        const worksheet = workbook.addWorksheet(`${jsonData.name} ${jsonData.sheet}`);
        worksheet.addRow(jsonData.header);
        jsonData.list.forEach((row: any[]) => {
            const colorIndex = jsonData.type === 'origin'
                ? row[originNameIndex].includes('✅') ? 0 : row[originNameIndex].includes('⚠️') ? 1 : 2
                : row[cloudTitleIndex].includes('✅') ? 0 : row[cloudTitleIndex].includes('⚠️') ? 1 : 2;
            const fill: ExcelJS.Fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: rowColors[colorIndex] }
            };

            const dataRow: ExcelJS.Row = worksheet.addRow(row);
            dataRow.eachCell((cell: ExcelJS.Cell, colNumber: number) => {
                if(jsonData.type === 'origin' && [originNameIndex+1, originPriceIndex-1].includes(colNumber)) {
                    cell.fill = fill;
                } else if(jsonData.type === 'cloud' && [cloudTitleIndex+1, cloudPriceIndex+1].includes(colNumber)) {
                    cell.fill = fill;
                }
                
            });
        });
    }
    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `【核对后】${originData.name}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }).catch(err => console.error('下载文件出错。', err));

    return originData;
};

const FileUploadForm = ({ onFileUpload }: { onFileUpload: Function }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            Promise.all(Array.from(event.target.files).map(file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = e => {
                    const workbook = new ExcelJS.Workbook();
                    workbook.xlsx.load(e.target?.result as ArrayBuffer).then(() => {
                        const excelData: { name: string, sheet: string, type: string, header: String[], list: any[] } = { name: file.name.replace('.xlsx', ''), sheet: '', type: '', header: [], list: [] };
                        const cloudSheet: ExcelJS.Worksheet | undefined = workbook.worksheets.find(item => item.name === '财务云');
                        if (cloudSheet) {
                            excelData.type = 'cloud';
                            excelData.sheet = cloudSheet.name;
                            cloudSheet && cloudSheet.eachRow((rowData: ExcelJS.Row, rowNumber: number) => _cloudExcel(rowData, rowNumber, excelData));
                        } else {
                            const originSheet: ExcelJS.Worksheet | undefined = workbook.worksheets[0];
                            excelData.type = 'origin';
                            excelData.sheet = originSheet?.name||'';
                            originSheet && originSheet.eachRow((rowData: ExcelJS.Row, rowNumber: number) => _originExcel(rowData, rowNumber, excelData));
                        }
                        resolve(excelData);
                    }).catch(err => console.error('Error reading Excel file:', err.message));
                };
                reader.onerror = reject;
                reader.readAsArrayBuffer(file);
            })))
                .then(jsonDatas => onFileUpload(_verify(jsonDatas)))
                .catch(error => console.error('Error reading files:', error));
        }
    };

    return (
        <div className="w-full p-4">
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} multiple />
        </div>
    );
}

export default () => {
    const [{ header, list }, setExcelData] = useState<{ type: string, header: String[], list: any[] }>({ type: '', header: [], list: [] });

    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <FileUploadForm onFileUpload={setExcelData} />
            </div>

            <div className="mt-4">
                <table className="w-full border">
                    <thead>
                        <tr>
                            {header.length > 0 && header.map((header: any, index: number) => <th key={index} className="border p-2">{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((row: any, rowIndex: number) => (
                            <tr key={rowIndex} className={row[originNameIndex].includes('✅') ? 'bg-yellow-300' : row[originNameIndex].includes('⚠️') ? 'bg-red-400' : ''}>
                                {row.map((cell: any, cellIndex: number) => <td key={cellIndex} className="border p-2">{cell}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}