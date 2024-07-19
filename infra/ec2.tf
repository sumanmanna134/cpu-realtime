data "aws_ami" "ubuntu"{
    most_recent = true
    filter {
      name = "name"
      values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]

    }
     filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
  owners = ["099720109477"] # Canonical
}
data "aws_key_pair" "existing_key_pair"{
    key_name = "k8s-master-SG.pem"
}

resource "aws_instance" "website" {
    ami = data.aws_ami.ubuntu.id
    instance_type = "t2.medium"
    vpc_security_group_ids = [aws_security_group.my_instance_sg.id]
    key_name = data.aws_key_pair.existing_key_pair.key_name
    user_data = 
  
}