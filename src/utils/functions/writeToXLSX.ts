import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as XLSX from "xlsx";
import { TMeasure } from "../../@types/landmarks";
import { TXLSXData } from "../../@types/xlsx";

export default async function writeToXLSX(data: TXLSXData[]): Promise<void> {
  const parsedData = data.map(
    ({ participant, frontalMeasures, profileMeasures }) => {
      let r: any = {
        Participante: participant.name,
      };
      if (frontalMeasures) {
        Object.values(frontalMeasures).forEach((value: TMeasure) => {
          r[value.name] = value.value;
        });
      }
      if (profileMeasures) {
        Object.values(profileMeasures).forEach((value: TMeasure) => {
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
