import uuid from "react-native-uuid";
import Realm from "realm";
import { TFrontalPredictions, TParticipant } from "../../@types/database";
import { tablesNames } from "../../constants/database";
import { getRealm } from "../realm";

export default class FrontalPredictionsService {
  /**
   * Create new predictions in the data base
   * @param participant_id - Owener of the predictions id
   * @param data - New predictions object
   * @returns Created predictions
   */
  async writeForExistingParticipant(
    participant_id: string,
    data: Omit<TFrontalPredictions, "_id" | "participant_id" | "created_at">
  ) {
    const db = await getRealm();
    try {
      //check if participant exists
      const participant = db.objectForPrimaryKey<TFrontalPredictions>(
        tablesNames.participant,
        participant_id
      );

      //only write to the db is particpant exists
      if (participant) {
        const predictions = db.write(() => {
          const created = db.create<TFrontalPredictions>(
            tablesNames.frontalPred,
            {
              ...data,
              _id: uuid.v4() as string,
              participant_id,
              created_at: new Date(),
            }
          );
          console.log("created ======>", created);
          return created;
        });
        return predictions;
      }
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }

  /**
   * Create new predictions in the data base
   * @param participant_data - New particpant data
   * @param data - New predictions object
   * @returns Created predictions
   */
  async writeForNewParticipant(
    particpant_data: Omit<TParticipant, "_id" | "created_at">,
    data: Omit<TFrontalPredictions, "_id" | "participant_id" | "created_at">
  ) {
    const db = await getRealm();
    try {
      //create new particpant
      const newParticipant = db.write(() => {
        return db.create<TParticipant>(tablesNames.participant, {
          ...particpant_data,
          _id: uuid.v4() as string,
          created_at: new Date(),
        });
      });

      //create predictions
      const savedParticipant = db.write(() => {
        const created = db.create<TFrontalPredictions>(
          tablesNames.frontalPred,
          {
            ...data,
            _id: uuid.v4() as string,
            participant_id: newParticipant._id,
            created_at: new Date(),
          }
        );
        return created;
      });
      return savedParticipant;
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }

  /**
   * Get all predictions for a particpant
   * @param participant_id - Precidtions' owner id
   * @returns Array with predictions for that particpant
   */
  async readByParticipant(
    participant_id: string
  ): Promise<Realm.Results<TFrontalPredictions & Realm.Object>> {
    const db = await getRealm();
    try {
      const allPreds = db.objects<TFrontalPredictions>(tablesNames.frontalPred);
      return allPreds.filtered(`particpant_id == ${participant_id}`);
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }

  /**
   * Get predictions by it's id from database
   * @param id - Predictions' id
   * @returns one prediction
   */
  async readById(id: string) {
    const db = await getRealm();
    try {
      const object = db.objectForPrimaryKey<TFrontalPredictions>(
        tablesNames.frontalPred,
        id
      );
      return object;
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }

  /**
   * Update a predictions by it's id from database
   * @param _id - Predictions' id
   * @param data -  Data to update
   * @returns one prediction
   */
  async updateById(
    _id: string,
    data: Partial<Omit<TFrontalPredictions, "_id">>
  ) {
    const db = await getRealm();
    try {
      return db.write(() => {
        const object = db.objectForPrimaryKey<TFrontalPredictions>(
          tablesNames.frontalPred,
          _id
        );
        if (object) {
          return db.create<TFrontalPredictions>(
            tablesNames.frontalPred,
            { _id, ...data },
            Realm.UpdateMode.Modified
          );
        }
      });
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }

  /**
   * Delete a predictions by it's id from database
   * @param _id Partcipant's id
   */
  async deleteOne(_id: "string") {
    const db = await getRealm();
    try {
      var object = db.objectForPrimaryKey<TFrontalPredictions>(
        tablesNames.frontalPred,
        _id
      );
      db.write(() => {
        db.delete(object);
        object = null;
      });
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }
}
