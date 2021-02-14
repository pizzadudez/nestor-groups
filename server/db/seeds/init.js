exports.seed = async (knex) => {
  // Truncate tables
  await knex('persons').del();
  await knex('groups').del();

  // Create 2 levels of groups
  const rootGroups = await knex('groups')
    .insert([{ name: 'g1' }, { name: 'g2' }])
    .returning(['id', 'name', 'level']);
  await knex('groups').insert([
    {
      name: `${rootGroups[0].name}-g1`,
      belongs_to: rootGroups[0].id,
      level: rootGroups[0].level + 1,
    },
    {
      name: `${rootGroups[0].name}-g2`,
      belongs_to: rootGroups[0].id,
      level: rootGroups[0].level + 1,
    },
    {
      name: `${rootGroups[1].name}-g1`,
      belongs_to: rootGroups[1].id,
      level: rootGroups[1].level + 1,
    },
    {
      name: `${rootGroups[1].name}-g2`,
      belongs_to: rootGroups[1].id,
      level: rootGroups[1].level + 1,
    },
    {
      name: `${rootGroups[1].name}-g3`,
      belongs_to: rootGroups[1].id,
      level: rootGroups[1].level + 1,
    },
  ]);

  // Add 3 persons to each group
  const persons = [];
  const groupIds = await knex('groups').select(['id', 'name']);
  groupIds.forEach((group) => {
    persons.push({
      first_name: `${group.name}-p1`,
      last_name: 'Johnson',
      job_title: 'Unpaid Intern',
      belongs_to: group.id,
    });
    persons.push({
      first_name: `${group.name}-p2`,
      last_name: 'Johnson',
      job_title: 'Manager',
      belongs_to: group.id,
    });
    persons.push({
      first_name: `${group.name}-p3`,
      last_name: 'Johnson',
      job_title: 'CEO',
      belongs_to: group.id,
    });
  });
  return knex('persons').insert(persons);
};
