const en={
    notification:{
        status:'Notification',
        message:{
            login:{
                false:'Wrong email or password',
            },
            remove:{
                register:'Did you sure you want to remove this register?',
            },
            error:{
                register:'False to remove this register',
                'null-fields':'Enter all the data fields.',
                'update-false':'False to update this data',
                'create-false':'False to create',
            },
        },
        btn:{
            cancel:'Cancel',
            ok:'Ok',
            success:'Success',
        }
    },
    status:{
        title:'Status',
        register:{
            0:'Waiting',
            1:'Active',
            2:'Cancelled',
        }
    },
    register_detail:{
        tern:'Tern:',
        regu:'Regulation:',
        orien:'Orientation:',
        sort:'Sort Description:',
        full:'Full Description:',
        lec:'Lecture:',
        managers:'Managers:',
        name:'Register name:',
        create:'Created at:'
    },
    create:{
      club:{
          name:{
              title:'Input the club name',
              des:'Name of club will be the key for member can be search to join'
          },
          orien:{
              title:'Input the orientation of the club',
              des:'Orientation:The club\'s orientation will be used to advise members about the club',
          },
          sort:{
              title:'Input the sort description',
              des:'Short description will be show when member searching club'
          },
          full:{
              title:'Input the full description',
              des:'Full description will be show on the club screenclub',
          },
          lect:{
              opTitle:'Choose the type of input lecturer',
              opDes:'You can add a lecturer after the information is approved, or the school will assign a lecturer.',
              inputTitle:'Input the club lecture',
              inputDes:'Enter your lecturer code. You can check the lecturer code on the school\'s website.',
              options:{
                  true:'Add your lecturer',
                  false:'School assign lecturer',
              }
          },
          managers:{
              opTitle:'Add a member of the management board',
              opDes:'You can add members after they\'ve been approved',
              inputTitle:'Input the management board',
              inputDes:'Enter the management board code to add the list',
              options:{
                  true:'Add a management board',
                  false:'Add latter',
              }
          },
          file:{
              opTitle:'Change new tern and regular file',
              opDes:'If dont change the old files will be used',
              tern:'Choose file tern of club',
              ternDes:'The terms of the club are mandatory when initiating the club. The Terms govern the club as well as its members.',
              regular:'Choose file regulations of club.',
              regularDes:'Regulations are mandatory when initiating a club. The regulations aim to regulate and sanction the club.',
              options:{
                  true:'Change files',
                  false:'Keep old files',
              }
          },
          tern:{
            title:'Tern file:',
              des:'This file needs to contain the rules for activities in the club'
          },
          regular:{
              title:'Regulation file:',
              des:'This file needs to contain the rules for activities in the club'
          },
          policy:'Agree to the school\'s policies and the app\'s policies on club management and operations.',
          btn:{
              pre:'Pre step',
              next:'Next step',
              submit:'Submit',
          }
      }
    },
    head:{
      home:'Home',
        clubs:'Clubs',
      events:'Events',
      calendar:'Calendar',
      notification:'Notification',
      menu:'Menu',
      profile:'Profile',
      search:'Search',
    },
    login:{
        text:'Login',
        form:{
            title:'Login your account',
            des:'You must login with school account',
            email:{
                title:'Email',
                placeholder:'Email',
            },
            password:{
                title:'Password',
                placeholder:'Password',
            },
            btn:'Login',
            option:{
                true:'Show password',
                false:'Hide password',
            }
        },

    }
}
//
export default en;