import db from '../../db';

interface GroupDataCreate {
  name: string;
  belongs_to?: number;
}
interface GroupDataUpdate {
  id: number;
  name?: string;
  belongs_to?: number;
}

const create = async (data: GroupDataCreate) => {
  await db('groups').insert(data);
};
const update = async (id: number, data: GroupDataUpdate) => {
  let oldGroupId = null;
  // Get oldGroupId before lose it by updating the subgroup
  if (data.belongs_to) {
    const ids = await db('groups').pluck('belongs_to').where({ id });
    oldGroupId = ids[0];
  }
  await db('groups')
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
  const { rows } = await db.raw(
    `SELECT *, (
      SELECT ARRAY_AGG(id) FROM groups WHERE belongs_to = g.id
    ) as subgroups, (
      SELECT ARRAY_AGG(id) FROM persons WHERE belongs_to = g.id
    ) as persons
    FROM groups g`
  );
  return rows;
};

export default { create, update, get };
