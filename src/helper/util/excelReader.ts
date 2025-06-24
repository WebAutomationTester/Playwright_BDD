// utils/excelReader.ts
import * as XLSX from 'xlsx';
import { readFileSync } from 'fs';
import path from 'path';

interface ExcelRow {
    [key: string]: any;
}

export class ExcelReader {
    static readExcelData(filePath: string, sheetName?: string): ExcelRow[] {
        try {
            // Resolve the file path
            const absolutePath = path.resolve(process.cwd(), filePath);
            
            // Read the file
            const file = readFileSync(absolutePath);
            const workbook = XLSX.read(file, { type: 'buffer' });
            
            // Get the specified sheet or first sheet if not specified
            const sheetToUse = sheetName 
                ? workbook.Sheets[sheetName]
                : workbook.Sheets[workbook.SheetNames[0]];
            
            if (!sheetToUse) {
                throw new Error(`Sheet ${sheetName || 'first sheet'} not found`);
            }
            
            // Convert to JSON
            return XLSX.utils.sheet_to_json<ExcelRow>(sheetToUse);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error reading Excel file: ${error.message}`);
            }
            throw new Error('Unknown error occurred while reading Excel file');
        }
    }

    static getTestData(filePath: string, sheetName: string, testCaseId: string): ExcelRow {
        const data = this.readExcelData(filePath, sheetName);
        const row = data.find((row: ExcelRow) => row.TestCaseID === testCaseId);
        
        if (!row) {
            throw new Error(`Test case with ID ${testCaseId} not found in sheet ${sheetName}`);
        }
        
        return row;
    }
}

// const xlsx = require('xlsx');

// class ExcelReader {
//   static getTestData(filePath, sheetName, testCaseId) {
//     const workbook = xlsx.readFile(filePath);
//     const sheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(sheet);
    
//     return data.find(row => row.TestCaseID === testCaseId);
//   }
// }