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
  let parentLevel = undefined;
  if (data.belongs_to) {
    const levels = await db('groups')
      .pluck('level')
      .where({ id: data.belongs_to });
    parentLevel = levels[0];
  }
  console.log(parentLevel);
  await db('groups').insert({
    ...data,
    ...(parentLevel && { level: parentLevel + 1 }),
  });
};
const update = async (id: number, data: GroupDataUpdate) => {
  let oldGroupId = null;
  let newParentLevel = undefined;
  if (data.belongs_to) {
    // Get oldGroupId before lose it by updating the subgroup
    const ids = await db('groups').pluck('belongs_to').where({ id });
    oldGroupId = ids[0];
    // Get level of new parent group
    const levels = await db('groups')
      .pluck('level')
      .where({ id: data.belongs_to });
    newParentLevel = levels[0];
  }
  await db('groups')
    .update({
      ...data,
      updated_at: db.fn.now(),
      ...(newParentLevel && { level: newParentLevel + 1 }),
    })
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
    FROM groups g
    ORDER BY id`
  );
  return rows;
};

export default { create, update, get };
