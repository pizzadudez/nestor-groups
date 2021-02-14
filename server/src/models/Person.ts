import db from '../../db';

interface PersonCreateData {
  first_name: string;
  last_name: string;
  job_title: string;
  belongs_to: number;
}
interface PersonUpdateData {
  id: number;
  first_name?: string;
  last_name?: string;
  job_title?: string;
  belongs_to?: number;
}

const create = async (data: PersonCreateData) => {
  await db('persons').insert(data);
};
const update = async (id: number, data: PersonUpdateData) => {
  let oldGroupId = null;
  // Get oldGroupId before lose it by updating the subgroup
  if (data.belongs_to) {
    const ids = await db('persons').pluck('belongs_to').where({ id });
    oldGroupId = ids[0];
  }
  await db('persons')
    .update({ ...data, updated_at: db.fn.now() })
    .where({ id });

  // update updated_at for old new and new group
  if (oldGroupId) {
    await db('groups')
      .update({ updated_at: db.fn.now() })
      .where({ id: oldGroupId });
  }
  if (data.belongs_to) {
    await db('groups')
      .update({ updated_at: db.fn.now() })
      .where({ id: data.belongs_to });
  }
};
const get = async () => {
  return db('persons').select();
};

export default { create, update, get };
