const express = require('express');
const roles = express.Router();
const Role = require('../models/Role');

roles.get('/get-roles',(req,res)=>{
    Role.findAll().then(roles=>{
        res.json(roles);
    });
});

roles.get('/admin/get-roles',(req,res)=>{
    Role.findAll({where:{role:['teacher','librarian']}}).then(roles=>{
        mappedRoles = roles.map(role=>{
            return mappedRole = {
                id:role.id,
                role:role.role[0].toUpperCase() +  
                role.role.slice(1),
            };
        })
        res.json(mappedRoles);
    });
});

roles.get('/teacher/get-roles',(req,res)=>{
    roles.findAll({where:{role:'student'}}).then(roles=>{
        mappedRoles = roles.map(role=>{
            return mappedRole = {
                id:role.id,
                role:role.role[0].toUpperCase() +  
                role.role.slice(1),
            };
        })
        res.json(mappedRoles);
    });
})
    
module.exports = roles;