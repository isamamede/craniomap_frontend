import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as XLSX from "xlsx";
import { TMesure } from "../@types/landmarks";
import { TXLSXData } from "../@types/xlsx";

export default async function writeToXLSX(data: TXLSXData[]): Promise<void> {
  const parsedData = data.map(
    ({ participant, frontalMesures, profileMesures }) => {
      let r: any = {
        Participante: participant.name,
      };
      if (frontalMesures) {
        Object.values(frontalMesures).forEach((value: TMesure) => {
          r[value.name] = value.value;
        });
      }
      if (profileMesures) {
        Object.values(profileMesures).forEach((value: TMesure) => {
          r[value.name] = value.value;
        });
      }
      return r;
    }
  );

  var ws = XLSX.utils.json_to_sheet(parsedData);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `Dados PIC`);
  const wbout = XLSX.write(wb, {
    type: "base64",
    bookType: "xlsx",
  });
  const uri = FileSystem.cacheDirectory + `dados-pic.xlsx`;
  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64,
  });

  await Sharing.shareAsync(uri, {
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    dialogTitle: "My data",
    UTI: "com.microsoft.excel.xlsx",
  });
}
