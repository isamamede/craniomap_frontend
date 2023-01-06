import uuid from "react-native-uuid";
import Realm from "realm";
import { TParticipant } from "../../@types/database";
import { tablesNames } from "../../constants/database";
import { getRealm } from "../realm";

/**
 * Create new particpant in the data base
 * @param data - New particpant object
 * @returns Created particpant
 */
export async function writeParticipant(
  data: Omit<TParticipant, "_id" | "created_at">
) {
  const db = await getRealm();

  try {
    return db.write(() => {
      return db.create<TParticipant>(tablesNames.participant, {
        ...data,
        _id: uuid.v4() as string,
        created_at: new Date(),
      });
    });
  } finally {
    db.close();
  }
}

export default class ParticipantService {
  /**
   * Create new particpant in the data base
   * @param data - New particpant object
   * @returns Created particpant
   */
  async write(data: Omit<TParticipant, "_id" | "created_at">) {
    const db = await getRealm();

    const created = db.write(() => {
      return db.create<TParticipant>(tablesNames.participant, {
        ...data,
        _id: uuid.v4() as string,
        created_at: new Date(),
      });
    });
    db.close();
    return created;
  }

  /**
   * Get all particpants from database
   * @returns Array with all particpants
   */
  async readAll() {
    const db = await getRealm();
    try {
      const objects = db.objects<TParticipant>(tablesNames.participant);
      return objects;
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }

  /**
   * Get a particpant by it's id from database
   * @param id - Particant's id
   * @returns one participant
   */
  async readById(id: string) {
    const db = await getRealm();
    try {
      const object = db.objectForPrimaryKey<TParticipant>(
        tablesNames.participant,
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
   * Update a particpant by it's id from database
   * @param _id - Particant's id
   * @param data -  Data to update
   * @returns one participant
   */
  async updateById(_id: string, data: Partial<Omit<TParticipant, "_id">>) {
    const db = await getRealm();
    try {
      return db.write(() => {
        const object = db.objectForPrimaryKey<TParticipant>(
          tablesNames.participant,
          _id
        );
        if (object) {
          return db.create<TParticipant>(
            tablesNames.participant,
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
   * Delete a particpant and it's predictions by it's id from database
   * @param _id Partcipant's id
   */
  async deleteOne(_id: "string") {
    const db = await getRealm();
    try {
      var object = db.objectForPrimaryKey<TParticipant>(
        tablesNames.participant,
        _id
      );
      var particpantsFPred = db
        .objects(tablesNames.frontalPred)
        .filtered(`particpant_id == ${object?._id}`);
      var particpantsPPred = db
        .objects(tablesNames.profilePred)
        .filtered(`particpant_id == ${object?._id}`);

      db.write(() => {
        db.delete(object);
        db.delete(particpantsFPred);
        db.delete(particpantsPPred);
        object = null;
      });
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }

  /**
   * Delete all particpants and their predictions
   */
  async deleteAll() {
    const db = await getRealm();

    try {
      db.write(() => {
        db.delete(db.objects(tablesNames.participant));
        db.delete(db.objects(tablesNames.frontalPred));
        db.delete(db.objects(tablesNames.profilePred));
      });
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }
}
